import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-950 text-gray-400 py-12 border-t border-slate-800 relative z-10" id="footer">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-white text-xl font-bold mb-4">ALGOMATE</h3>
                        <p className="text-sm leading-relaxed">
                            Partenerul tău de încredere pentru excelență în educație.
                            Pregătim viitorii lideri în tehnologie și științe exacte.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Link-uri Rapide</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Acasă</a></li>
                            <li><a href="#modules" className="hover:text-blue-500 transition-colors">Programe</a></li>
                            <li><a href="#features" className="hover:text-blue-500 transition-colors">Despre Noi</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Termeni și Condiții</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center"><Mail size={16} className="mr-2" /> algomate.razvan@gmail.com</li>
                            <li className="flex items-center"><MapPin size={16} className="mr-2" /> București, România</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Urmărește-ne</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
                    <p>&copy; {new Date().getFullYear()} AlgoMate. Toate drepturile rezervate.</p>
                    <p>Designed with ❤️ for Education.</p>
                </div>
            </div>
        </footer>
    );
};

export default React.memo(Footer);
