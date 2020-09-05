"use strict";
const data = [
  {
    nip_pendek: "060010001",
    nip_panjang: "1970010120050110001",
    nama: "APRIANTO",
    jabatan: "pelaksana",
    password: "123456",
    status: 1,
    role: "pegawai",
    kpp_kode: "028",
  },
  {
    nip_pendek: "060010002",
    nip_panjang: "1970010120050110002",
    nama: "BAMBANG",
    jabatan: "pelaksana",
    password: "123456",
    status: 1,
    role: "pegawai",
    kpp_kode: "028",
  },
  {
    nip_pendek: "060010003",
    nip_panjang: "1970010120050110003",
    nama: "CANTIK",
    jabatan: "pelaksana",
    password: "123456",
    status: 1,
    role: "pegawai",
    kpp_kode: "028",
  },
  {
    nip_pendek: "060010004",
    nip_panjang: "1970010120050110004",
    nama: "DIMAS",
    jabatan: "pelaksana",
    password: "123456",
    status: 1,
    role: "pegawai",
    kpp_kode: "028",
  },
  {
    nip_pendek: "060010010",
    nip_panjang: "1970010120050110010",
    nama: "ERIKK",
    jabatan: "pelaksana",
    password: "123456",
    status: 1,
    role: "admin_kpp",
    kpp_kode: "028",
  },
  {
    nip_pendek: "060010099",
    nip_panjang: "1970010120050110099",
    nama: "TONY STARK",
    jabatan: "pelaksana",
    password: "123456",
    status: 1,
    role: "admin",
    kpp_kode: null,
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("pegawai", data, {});
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
