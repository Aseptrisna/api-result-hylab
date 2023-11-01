const requestResponse = {
  success: {
    code: 200,
    status: true,
    message: "Berhasil Memuat Permintaan",
  },
  success_updateHistory: {
    code: 200,
    status: true,
    message: "Kasus Telah Berhasil Diselesaikan",
  },
  success_updateDevice: {
    code: 200,
    status: true,
    message: "Data Device Berhasil Diubah",
  },
  success_register: {
    code: 200,
    status: true,
    message: "Akun Anda Berhasil Terdaftar!",
  },
  success_register_device: {
    code: 200,
    status: true,
    message: "Device Berhasil Didaftarkan!",
  },
  success_addHistory: {
    code: 200,
    status: true,
    message: "History Berhasil Ditambahkan!",
  },
  incomplete_body: {
    code: 400,
    status: false,
    message: "Permintaan Gagal, Silakan periksa data permintaan Anda",
  },
  unauthorized: {
    code: 401,
    status: false,
    message:
      "Email atau Kata Sandi Tidak Cocok, atau Anda tidak diizinkan mengakses halaman ini",
  },
  not_found: {
    code: 404,
    status: false,
    message: "Gagal Memuat Permintaan",
  },
  unprocessable_entity: {
    code: 422,
    status: false,
    message: "Permintaan yang Anda kirim tidak dapat diproses",
  },
  server_error: {
    code: 500,
    status: false,
    message: "Kesalahan Pada Server, Silakan Hubungi Administrator",
  },
  failed: {
    code: 404,
    status: false,
    message: "Permintaan Gagal",
  },
  email_register: {
    code: 404,
    status: false,
    message: "Email Sudah Terdaftar",
  },
  device_register_failed: {
    code: 404,
    status: false,
    message: "Device Sudah Terdaftar",
  },
  contact_register: {
    code: 404,
    status: false,
    message: "Nomor Telepon Sudah Terdaftar",
  },
  invalid_email: {
    code: 404,
    status: false,
    message: "Email Tidak Terdaftar",
  },
  info_account: {
    code: 401,
    status: false,
    message: "Akun Belum Aktif",
  },
  invalid_emailotp: {
    code: 404,
    status: false,
    message: "Email atau kode OTP Salah",
  },
  success_response: {
    code: 200,
    status: true,
  },
  error_response: {
    code: 404,
    status: false,
  },
};

function getRndInteger() {
  return Math.floor(Math.random() * 1000000);
}

module.exports = {
  requestResponse,
  getRndInteger,
};
