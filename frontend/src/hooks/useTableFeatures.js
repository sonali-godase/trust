import { useState, useMemo } from 'react';

export const useTableFeatures = (data, searchFields = []) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowercasedTerm = searchTerm.toLowerCase();
    return data.filter((item) => {
      return searchFields.some((field) => {
        const val = getNestedValue(item, field);
        return val && String(val).toLowerCase().includes(lowercasedTerm);
      });
    });
  }, [data, searchTerm, searchFields]);

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const valA = getNestedValue(a, sortConfig.key) || '';
        const valB = getNestedValue(b, sortConfig.key) || '';
        if (valA < valB) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Reset to first page when search changes
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    sortConfig,
    handleSort,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    paginatedData,
    totalItems
  };
};
