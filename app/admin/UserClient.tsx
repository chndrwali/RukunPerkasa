'use client';

import { Role, User } from '@prisma/client';
import moment from 'moment';
import Image from 'next/image';
import { useState } from 'react';
import { FaEdit, FaTrash, FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ActionBtn from '../components/ActionBtn';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Modal, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';

interface UserClientProps {
  users: User[];
}

const UserClient: React.FC<UserClientProps> = ({ users }) => {
  const [rows, setRows] = useState<any[]>(users || []);
  const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 10 });
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'USER' | 'ADMIN'>();

  useState(() => {
    if (users) {
      const updatedRows = users.map((user) => ({
        id: user.id,
        name: user.name,
        image: user.image,
        role: user.role,
        email: user.email,
        joindate: moment(user.createdAt).format('DD/MM/YYYY'),
      }));
      setRows(updatedRows);
    }
  });

  const handleEditRole = (id: string) => {
    setSelectedUserId(id);
    setOpenModel(true);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const roleValue = (event.target as HTMLInputElement).value;
    if (roleValue === 'user' || roleValue === 'admin') {
      setSelectedRole(roleValue.toUpperCase() as 'USER' | 'ADMIN');
    } else {
      // Handle invalid role value here
      console.error('Invalid role value:', roleValue);
    }
  };

  const handleSaveRole = async () => {
    try {
      toast('Sedang menyimpan peran pengguna...');
      await axios.put(`/api/users/${selectedUserId}`, { role: selectedRole });

      // Update role in UI
      const updatedRows = rows.map((user) => {
        if (user.id === selectedUserId) {
          return { ...user, role: selectedRole };
        }
        return user;
      });
      setRows(updatedRows);

      toast.success('Peran pengguna berhasil disimpan');
    } catch (error) {
      toast.error('Ups! Terjadi kesalahan saat menyimpan peran pengguna');
      console.error('Failed to save user role:', error);
    } finally {
      setSelectedUserId(null);
      setOpenModel(false);
      setSelectedRole(undefined);
    }
  };

  const handleDeleteUser = async () => {
    try {
      toast('Sedang menghapus akun pengguna...');
      await axios.delete(`/api/users/${selectedUserId}`);

      // Hapus pengguna dari state setelah berhasil dihapus
      const updatedRows = rows.filter((user) => user.id !== selectedUserId);
      setRows(updatedRows);
      toast.success('Pengguna sudah terhapus');
    } catch (error) {
      toast.error('Ups! Ada yang salah');
      console.error('Failed to delete user:', error);
    } finally {
      setSelectedUserId(null);
      setOpenModal(false);
    }
  };

  const handleOpenModal = (id: string) => {
    setSelectedUserId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
    setOpenModal(false);
  };

  const handleCloseModel = () => {
    setSelectedUserId(null);
    setOpenModel(false);
  };

  const totalItems = rows.length;
  const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  const changePage = (pageNumber: number) => {
    setPagination({ ...pagination, currentPage: pageNumber });
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto" style={{ minHeight: '580px' }}>
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b  bg-gray-50 ">
                <th className="px-4 py-3">ID User</th>
                <th className="px-4 py-3">Nama User</th>
                <th className="px-4 py-3">Email User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Tanggal Gabung</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y ">
              {currentItems.map((row) => (
                <tr key={row.id} className="text-gray-700 ">
                  <td className="px-4 py-3">{row.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      {row.image ? <Image src={row.image} alt={row.name} width={40} height={40} className="w-8 h-8 rounded-full mr-2" /> : <FaUserCircle className="w-8 h-8 rounded-full mr-2" />}
                      <span>{row.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{row.email}</td>
                  <td className="px-4 py-3">{row.role}</td>
                  <td className="px-4 py-3">{row.joindate}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-4 text-sm">
                      <ActionBtn icon={FaEdit} onClick={() => handleEditRole(row.id)} />
                      <ActionBtn icon={FaTrash} onClick={() => handleOpenModal(row.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t  bg-gray-50 sm:grid-cols-9 ">
        <span className="flex items-center col-span-3">
          {' '}
          Menunjukan {indexOfFirstItem + 1} - {indexOfLastItem} dari {totalItems}{' '}
        </span>
        <span className="col-span-2"></span>
        {/* Pagination */}
        <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
          <nav aria-label="Table navigation">
            <ul className="inline-flex items-center">
              {Array.from({ length: Math.ceil(totalItems / pagination.itemsPerPage) }).map((_, index) => (
                <li key={index}>
                  <motion.button
                    onClick={() => changePage(index + 1)}
                    className={`${
                      pagination.currentPage === index + 1
                        ? 'px-3 py-1 text-white transition-colors duration-150 bg-brown-500 border border-r-0 border-brown-500 rounded-md focus:outline-none focus:shadow-outline-purple'
                        : 'px-3 py-1 transition-colors duration-150 hover:bg-brown-500 hover:text-white rounded-md focus:outline-none focus:shadow-outline-purple'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {index + 1}
                  </motion.button>
                </li>
              ))}
            </ul>
          </nav>
        </span>
      </div>

      <Modal open={openModel} onClose={handleCloseModel} aria-labelledby="modal-title" aria-describedby="modal-description">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg">
          <h2 id="modal-title" className="text-lg font-semibold mb-4">
            Edit Peran Pengguna
          </h2>
          <p id="modal-description" className="text-sm text-gray-600 mb-4">
            Pilih peran baru untuk pengguna ini:
          </p>
          <FormControl component="fieldset">
            <RadioGroup aria-label="role" name="role" value={selectedRole} onChange={handleRoleChange}>
              <FormControlLabel value="user" control={<Radio />} label="USER" />
              <FormControlLabel value="admin" control={<Radio />} label="ADMIN" />
            </RadioGroup>
          </FormControl>
          <div className="flex justify-end gap-4">
            <button
              onClick={handleCloseModel}
              className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2  hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
            >
              Batal
            </button>
            <button
              onClick={handleSaveRole}
              className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-md sm:w-auto sm:mt-0 hover:bg-green-700 focus:outline-none focus:ring focus:green-blue-300 focus:ring-opacity-40"
            >
              Simpan
            </button>
          </div>
        </div>
      </Modal>

      <Modal open={openModal} aria-labelledby="modal-title" aria-describedby="modal-description">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg">
          <h2 id="modal-title" className="text-lg font-semibold mb-4">
            Konfirmasi Hapus Pengguna
          </h2>
          <p id="modal-description" className="text-sm text-gray-600 mb-4">
            Apakah Anda yakin ingin menghapus pengguna ini?
          </p>
          <div className="flex justify-end">
            <button
              onClick={handleCloseModal}
              className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2  hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
            >
              Batal
            </button>

            <button
              onClick={handleDeleteUser}
              className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-md sm:w-auto sm:mt-0 hover:bg-red-700 focus:outline-none focus:ring focus:red-blue-300 focus:ring-opacity-40"
            >
              <FaTrash className="inline-block mr-2" />
              Hapus
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserClient;
