import { Link } from "react-router-dom";

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 lg:p-8 bg-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-50 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl opacity-60"></div>
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        <div className="relative mb-8">
          <h1 className="text-9xl font-black text-gray-100 select-none">
            403
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl" role="img" aria-label="Forbidden">
              🚫
            </span>
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Akses Dibatalkan
        </h2>
        <p className="text-gray-500 text-lg mb-10 leading-relaxed font-medium">
          Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Silakan hubungi administrator atau kembali ke beranda.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link 
            to="/" 
            className="flex-1 inline-flex items-center justify-center h-14 px-8 text-lg font-bold text-white bg-red-600 rounded-xl shadow-lg shadow-red-200 hover:bg-red-700 hover:shadow-red-300 transform transition-all duration-200 active:scale-95"
          >
            Kembali ke Beranda
          </Link>
          <Link 
            to="/login" 
            className="flex-1 inline-flex items-center justify-center h-14 px-8 text-lg font-bold text-gray-700 bg-white border-2 border-gray-100 rounded-xl hover:bg-gray-50 transform transition-all duration-200 active:scale-95"
          >
            Masuk Kembali
          </Link>
        </div>
      </div>
      <p className="mt-12 text-sm text-gray-400 font-medium tracking-wide flex items-center gap-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        Sistem Keamanan Terintegrasi
      </p>
    </div>
  );
};

export default ForbiddenPage;
