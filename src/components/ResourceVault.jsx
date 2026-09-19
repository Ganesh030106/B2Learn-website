import React, { useState } from 'react';
import { Archive, Github, FileText, Video, Award, Download, ExternalLink, Sparkles, Search } from 'lucide-react';

export default function ResourceVault({ resources }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBadge, setActiveBadge] = useState(null);

  const filteredResources = resources.filter(res => 
    res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    res.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
    res.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass-panel p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Archive className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Post-Event Open Source Vault
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">Resource Archive & Learning Proof</h2>
          <p className="text-slate-400 text-sm">
            Access slides, code repositories, and downloadable attendance badges from past workshops.
          </p>
        </div>

        {/* Search */}
        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Search slides, repos, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Grid of Past Event Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map(res => (
          <div key={res.id} className="glass-card p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                  {res.chapter}
                </span>
                <span className="text-xs text-slate-400">{res.date} • {res.attendees} Attendees</span>
              </div>

              <h3 className="text-xl font-bold text-white">{res.title}</h3>

              <div className="flex flex-wrap gap-1.5">
                {res.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-semibold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/50">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links & Badge Button */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <a
                  href={res.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary text-xs py-2 px-3 rounded-lg flex-1 justify-center"
                >
                  <Github className="w-4 h-4 text-white" />
                  <span>GitHub Repo</span>
                </a>

                <a
                  href={res.slidesUrl}
                  onClick={(e) => { e.preventDefault(); alert('Opening Workshop Slides PDF...'); }}
                  className="btn-secondary text-xs py-2 px-3 rounded-lg flex-1 justify-center"
                >
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>Slides PDF</span>
                </a>
              </div>

              <button
                onClick={() => setActiveBadge(res)}
                className="btn-emerald text-xs py-2 px-4 w-full justify-center rounded-xl"
              >
                <Award className="w-4 h-4" />
                <span>Download Proof of Attendance Badge</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Badge Modal */}
      {activeBadge && (
        <div className="modal-overlay animate-fade-in">
          <div className="glass-panel max-w-md w-full p-6 text-center space-y-6 relative">
            <button
              onClick={() => setActiveBadge(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ×
            </button>

            <Award className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                VERIFIED COMMUNITY CERTIFICATE
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">{activeBadge.badgeTitle}</h3>
              <p className="text-xs text-slate-400 mt-2">
                Awarded for active participation in <strong className="text-slate-200">{activeBadge.title}</strong>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-xs space-y-1 font-mono text-slate-300">
              <p>ISSUED BY: Build2Learn Community</p>
              <p>DATE: {activeBadge.date}</p>
              <p>HASH: 0x8F92...B2LEARN</p>
            </div>

            <button
              onClick={() => { alert('Digital Badge Image downloaded to your device!'); setActiveBadge(null); }}
              className="btn-primary w-full py-2.5 text-xs justify-center rounded-xl"
            >
              <Download className="w-4 h-4" />
              <span>Download PNG Badge</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
