import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { X, ZoomIn, CircuitBoard, Cpu, Sparkles, Sliders } from 'lucide-react';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'PCB & Circuit', 'FPGA & Hardware', 'AI & Wafermap', 'Lab Environment'];

  const filteredGallery = selectedCategory === 'All'
    ? gallery
    : gallery.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-16 bg-[#fbfbfb] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex justify-between items-end border-b border-gray-200 pb-3 mb-8">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#0055ff] tracking-widest uppercase block mb-1">
              HARDWARE &amp; LAB ARCHIVE
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight italic">
              05. 하드웨어 갤러리 (Hardware &amp; Experimental Gallery)
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-400 hidden sm:block">
            REF: GALLERY_ARCHIVE_2026
          </span>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-start gap-1.5 mb-8 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 border font-bold uppercase transition-all rounded-none ${
                selectedCategory === cat
                  ? 'bg-[#0055ff] text-white border-[#0055ff] shadow-2xs'
                  : 'bg-white text-slate-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="bg-white border border-gray-200 hover:border-[#0055ff] transition-all cursor-pointer group flex flex-col justify-between rounded-none"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-[#1a1a1a]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 bg-[#1a1a1a]/90 text-white font-mono text-[9px] font-bold border border-slate-700 uppercase tracking-wider rounded-none">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 p-1 rounded-none bg-[#0055ff] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="p-3.5 space-y-1.5">
                  <div className="text-[10px] font-mono text-slate-400">{item.date}</div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1 group-hover:text-[#0055ff] transition-colors font-sans">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-3.5 pt-0 border-t border-gray-100 mt-2">
                <div className="flex flex-wrap gap-1">
                  {item.toolsUsed.map((tool) => (
                    <span key={tool} className="text-[9px] font-mono bg-gray-100 text-slate-600 border border-gray-200 px-1.5 py-0.5 rounded-none">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* High-Res Modal */}
        {activeModalItem && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-none max-w-2xl w-full border border-gray-300 shadow-2xl p-6 relative font-sans space-y-4">
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 p-1.5 bg-gray-100 hover:bg-gray-200 text-slate-600 transition-colors rounded-none"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-hidden bg-[#1a1a1a] max-h-80 flex items-center justify-center border border-gray-200">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2 py-0.5 bg-[#0055ff] text-white font-bold uppercase tracking-wider rounded-none">
                    {activeModalItem.category}
                  </span>
                  <span className="text-slate-500">{activeModalItem.date}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-sans">
                  {activeModalItem.title}
                </h3>

                <p className="text-xs text-slate-700 leading-relaxed bg-[#fbfbfb] p-3 border border-gray-200">
                  {activeModalItem.description}
                </p>

                <div className="bg-[#1a1a1a] text-white p-3 border border-slate-800 font-mono text-xs space-y-1">
                  <span className="text-[#0055ff] font-bold block uppercase">// TECHNICAL SPECIFICATIONS</span>
                  <p className="text-slate-200">{activeModalItem.technicalSpecs}</p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-slate-600">
                  <span className="font-bold">TOOLS USED:</span>
                  <div className="flex flex-wrap gap-1">
                    {activeModalItem.toolsUsed.map((tool) => (
                      <span key={tool} className="bg-gray-100 border border-gray-200 text-slate-800 px-2 py-0.5 text-[10px]">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 text-right">
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#0055ff] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-none"
                >
                  닫기 (Close)
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
