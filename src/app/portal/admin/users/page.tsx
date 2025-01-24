"use client";

import React, { useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { FaSort, FaTrash, FaPen } from "react-icons/fa";
import { Role } from "@prisma/client";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: 'STUDENT' | 'FACULTY' | 'ADMIN';
  isActive: boolean;
  lastAccess?: string;
}

interface FilterOptions {
  role: string;
  sortBy: 'name' | 'email' | 'role' | 'lastAccess';
  sortOrder: 'asc' | 'desc';
  searchTerm: string;
}

interface UserModalProps {
  onClose: () => void;
  onSave: (user: UserFormData) => Promise<void>;
  user?: User;
  className?: string;
}

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  isActive: boolean;
}

type SortByOption = 'name' | 'email' | 'role' | 'lastAccess';

function UserModal({ onClose, onSave, user, className }: UserModalProps) {
  const [formData, setFormData] = useState<Partial<User>>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'FACULTY',
    isActive: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${className || ''}`}>
      <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 md:w-1/2 max-w-2xl">
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          {user ? "Edit User" : "Add New User"}
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-800 mb-2">First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder-slate-600"
              />
            </div>
            <div>
              <label className="block text-slate-800 mb-2">Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder-slate-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-800 mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder-slate-600"
            />
          </div>
          <div>
            <label className="block text-slate-800 mb-2">Level of Access</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 text-slate-800"
            >
              <option value="STUDENT" className="text-slate-800">Student</option>
              <option value="FACULTY" className="text-slate-800">Faculty</option>
              <option value="ADMIN" className="text-slate-800">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-md hover:bg-slate-50 transition-colors text-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData as UserFormData)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {user ? "Save Changes" : "Create User"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    role: 'all',
    sortBy: 'name',
    sortOrder: 'asc',
    searchTerm: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: UserFormData) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to create user');
      
      const newUser = await response.json();
      setUsers(prev => [...prev, newUser]);
      closeModal();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  const saveUser = async (updatedUser: UserFormData): Promise<void> => {
    setUsers(users.map((user) => 
      user.id === editingUser?.id ? { ...user, ...updatedUser } : user
    ));
    closeModal();
  };

  const handleDelete = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Remove user from state
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error (maybe show a toast notification)
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFilters(prev => ({ 
      ...prev, 
      sortBy: value as SortByOption 
    }));
  };

  const filteredUsers = users
    .filter(user => {
      const matchesRole = filters.role === 'all' || user.role === filters.role;
      const matchesSearch = filters.searchTerm === '' || 
        `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase()
          .includes(filters.searchTerm.toLowerCase());
      return matchesRole && matchesSearch;
    })
    .sort((a, b) => {
      const order = filters.sortOrder === 'asc' ? 1 : -1;
      switch (filters.sortBy) {
        case 'name':
          return order * (`${a.firstName} ${a.lastName}`).localeCompare(`${b.firstName} ${b.lastName}`);
        case 'email':
          return order * a.email.localeCompare(b.email);
        case 'role':
          return order * a.role.localeCompare(b.role);
        case 'lastAccess':
          return order * ((a.lastAccess || '').localeCompare(b.lastAccess || ''));
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="bg-emerald-50 min-h-screen">
        <DashboardHeader 
          role="ADMIN" 
          userName="John Doe" 
          currentPath="/portal/admin/users"
          title="User Management"
        />
        <div className="container mx-auto p-6 text-center">
          <div className="text-emerald-600">Loading users...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-emerald-50 min-h-screen">
        <DashboardHeader 
          role="ADMIN" 
          userName="John Doe" 
          currentPath="/portal/admin/users"
          title="User Management"
        />
        <div className="container mx-auto p-6 text-center">
          <div className="text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-emerald-50 min-h-screen">
      <DashboardHeader 
        role="ADMIN"
        userName="John Doe"
        currentPath="/portal/admin/users"
        title="User Management"
      />

      <main className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-900">User Management</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
          >
            Add New User
          </button>
        </div>

        {/* Filters and Sorting Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 text-slate-800 placeholder-slate-600"
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
            />
          </div>
          <select
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 text-slate-800 bg-white"
            value={filters.role}
            onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
          >
            <option value="all" className="text-slate-800 bg-white">All Roles</option>
            <option value="STUDENT" className="text-slate-800 bg-white">Student</option>
            <option value="FACULTY" className="text-slate-800 bg-white">Faculty</option>
            <option value="ADMIN" className="text-slate-800 bg-white">Admin</option>
          </select>
          <select
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 text-slate-800 bg-white"
            value={filters.sortBy}
            onChange={handleFilterChange}
          >
            <option value="name" className="text-slate-800 bg-white">Sort by Name</option>
            <option value="email" className="text-slate-800 bg-white">Sort by Email</option>
            <option value="role" className="text-slate-800 bg-white">Sort by Role</option>
            <option value="lastAccess" className="text-slate-800 bg-white">Sort by Last Access</option>
          </select>
          <button
            onClick={() => setFilters(prev => ({ 
              ...prev, 
              sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc' 
            }))}
            className="p-2 rounded-md hover:bg-slate-100"
          >
            <FaSort className={`text-slate-800 ${
              filters.sortOrder === 'asc' ? 'rotate-0' : 'rotate-180'
            }`} />
          </button>
        </div>

        {users.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-slate-800">No users found in the system.</p>
            <p className="text-slate-700 mt-2">Click &quot;Add New User&quot; to create one.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">Email</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">ID</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">Last Access</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">Level</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t border-emerald-100 hover:bg-emerald-50">
                    <td className="px-6 py-4 text-slate-800">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-6 py-4 text-slate-800">{user.email}</td>
                    <td className="px-6 py-4 text-slate-800">{user.id}</td>
                    <td className="px-6 py-4 text-slate-800">{user.lastAccess || 'Never'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        user.role === 'ADMIN' ? 'bg-emerald-100 text-emerald-800' :
                        user.role === 'FACULTY' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        user.isActive ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
                          title="Edit user"
                        >
                          <FaPen size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete user"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {isAddModalOpen && (
        <UserModal 
          onClose={closeModal} 
          onSave={handleSubmit}
          className="bg-emerald-50"
        />
      )}

      {isEditModalOpen && editingUser && (
        <UserModal
          onClose={closeModal}
          onSave={saveUser}
          user={editingUser}
        />
      )}
    </div>
  );
}
