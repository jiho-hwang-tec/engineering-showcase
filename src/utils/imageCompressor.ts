/**
 * Client-side image compression utility
 * Automatically scales down large photos (e.g. 5~10MB phone captures)
 * to ~40-90KB JPEG with crisp quality, preventing localStorage QuotaExceededError.
 */
export const compressImage = (
  file: File,
  maxWidth = 1100,
  maxHeight = 1100,
  quality = 0.76
): Promise<string> => {
  return new Promise((resolve) => {
    if (!file) {
      resolve('');
      return;
    }

    // Direct read for SVG / GIF animation preservation
    if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const rawDataUrl = (e.target?.result as string) || '';
      if (!rawDataUrl) {
        resolve('');
        return;
      }

      const img = new Image();
      img.onload = () => {
        try {
          let { width, height } = img;
          if (width <= 0 || height <= 0) {
            resolve(rawDataUrl);
            return;
          }

          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(rawDataUrl);
            return;
          }

          // Fill white background for transparent PNG conversion to clean JPEG
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          let compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

          // If still large (> 140KB), step down quality to prevent localStorage quota issues
          if (compressedDataUrl.length > 180000) {
            compressedDataUrl = canvas.toDataURL('image/jpeg', 0.62);
          }
          if (compressedDataUrl.length > 220000) {
            const smallCanvas = document.createElement('canvas');
            smallCanvas.width = Math.round(width * 0.75);
            smallCanvas.height = Math.round(height * 0.75);
            const sCtx = smallCanvas.getContext('2d');
            if (sCtx) {
              sCtx.fillStyle = '#FFFFFF';
              sCtx.fillRect(0, 0, smallCanvas.width, smallCanvas.height);
              sCtx.drawImage(canvas, 0, 0, smallCanvas.width, smallCanvas.height);
              compressedDataUrl = smallCanvas.toDataURL('image/jpeg', 0.58);
            }
          }

          resolve(compressedDataUrl || rawDataUrl);
        } catch (err) {
          console.warn('Canvas compression fallback to raw data URL:', err);
          resolve(rawDataUrl);
        }
      };
      img.onerror = () => {
        resolve(rawDataUrl);
      };
      img.src = rawDataUrl;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
};

