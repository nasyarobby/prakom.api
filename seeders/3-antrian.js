"use strict";

const moment = require("moment");

const wajibpajak = [
  {
    npwp: "012003004028000",
    nama_wp: "CV. PRATAMA KOMUNIKASI",
    nama: "Robby",
    nik: "100200",
    telepon: "081200010002",
    email: "robby@gmail.com",
    kode_kpp: "028",
  },
  {
    npwp: "023004004028000",
    nama_wp: "PT. ETHERNET",
    nama: "Ahmad",
    nik: "100400",
    telepon: "081200010003",
    email: "Ahmad@gmail.com",
    kode_kpp: "028",
  },
  {
    npwp: "601005004028000",
    nama_wp: "KOPERASI PRANATA",
    nama: "Stephen",
    nik: "500200",
    telepon: "081200010004",
    email: "steppen@gmail.com",
    kode_kpp: "028",
  },
  {
    npwp: "701002001028000",
    nama_wp: "MICHAEL GORBACEV",
    nama: "MICHAEL GORBACEV",
    nik: "100200",
    telepon: "081200010002",
    email: "gorba@gmail.com",
    kode_kpp: "028",
  },
  {
    npwp: "701002002028000",
    nama_wp: "LENNY SUPRIADI",
    nama: "LENNY SUPRIADI",
    nik: "100201",
    telepon: "081200010002",
    email: "lennny@gmail.com",
    kode_kpp: "028",
  },
  {
    npwp: "701002003028000",
    nama_wp: "JUSTIN SLAMET",
    nama: "JUSTIN SLAMET",
    nik: "100202",
    telepon: "081200010003",
    email: "justin@gmail.com",
    kode_kpp: "028",
  },
  {
    npwp: "701002004028000",
    nama_wp: "KURNIAWAN SMITH",
    nama: "KURNIAWAN SMITH",
    nik: "100203",
    telepon: "081200010002",
    email: "smith@gmail.com",
    kode_kpp: "028",
  },
  {
    npwp: "701002005028000",
    nama_wp: "BAMBANG ASTERIX",
    nama: "BAMBANG ASTERIX",
    nik: "100204",
    telepon: "081200010012",
    email: "bambangoye@gmail.com",
    kode_kpp: "028",
  },
];

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("antrian", [
      ...wajibpajak.map((wp) => {
        return {
          ...wp,
          jadwal_mulai: moment("2020-09-08 14:00:00").toDate(),
          jadwal_selesai: moment("2020-09-08 14:30:00").toDate(),
          layanan_id: getRndInteger(1, 3),
          detil_layanan: "Permintaan layanan untuk wajib pajak.",
          kode: 789789,
        };
      }),
      ...wajibpajak.slice(0, 5).map((wp) => {
        return {
          ...wp,
          jadwal_mulai: moment("2020-09-09 08:00:00").toDate(),
          jadwal_selesai: moment("2020-09-09 08:30:00").toDate(),
          layanan_id: getRndInteger(1, 3),
          detil_layanan: "Permintaan layanan untuk wajib pajak.",
          kode: 789789,
        };
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
