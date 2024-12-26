export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-5xl font-bold text-red-500">404</h1>
            <p className="mt-4 text-xl text-gray-700">Halaman Tidak Ditemukan</p>
            <p className="mt-2 text-gray-600">
                URL yang Anda akses tidak valid. Silakan kembali ke halaman utama.
            </p>
            <a
                href="/"
                className="mt-6 px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
                Kembali ke Home
            </a>
        </div>
    );
}
