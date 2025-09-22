export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          환영합니다!
        </h1>
        <p className="text-md md:text-lg text-gray-600 mb-12">
          회원가입하고 시작해보세요
        </p>

        <div className="space-y-4 space-x-4">
          <button className="w-full md:w-64 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
            로그인
          </button>
          <button className="w-full md:w-64 bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-8 rounded-lg border-2 border-blue-600 transition-colors duration-200 shadow-lg hover:shadow-xl">
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
