import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 lg:p-8 bg-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-red-50 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-50 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl opacity-60"></div>
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        <div className="relative mb-8">
          <h1 className="text-9xl font-black text-gray-100 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl" role="img" aria-label="Not Found">
              🔍
            </span>
          </div>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-gray-500 text-lg mb-10 leading-relaxed font-medium">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan ke alamat lain.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center h-14 px-8 text-lg font-bold text-white bg-red-600 rounded-xl shadow-lg shadow-red-200 hover:bg-red-700 hover:shadow-red-300 transform transition-all duration-200 active:scale-95"
        >
          Kembali ke Beranda
        </Link>
      </div>
      {/* Subtle micro-animation */}
      <div className="mt-12 flex gap-4">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className="w-2 h-2 bg-red-200 rounded-full animate-bounce" 
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default NotFoundPage;
