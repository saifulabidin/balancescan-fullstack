// Komponen Loader untuk menampilkan animasi loading
const Loader = () => (
  <div className="flex flex-col items-center justify-center gap-3">
    {/* Lingkaran animasi loading */}
    <div className="w-10 h-10 border-4 border-[rgb(177,250,40)] border-t-transparent rounded-full animate-spin"></div>
    {/* Pesan teks animasi */}
    <div className="text-[rgb(165,224,54)] text-sm animate-pulse">
      Scanning, Please Wait!
    </div>
  </div>
);

export default Loader;
