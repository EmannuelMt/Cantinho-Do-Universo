// Formata datas para o formato brasileiro
export const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

// Gera um ID único
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Filtra itens por categoria
export const filterByCategory = (items, category) => {
  return category === 'Todas' 
    ? items 
    : items.filter(item => item.category === category);
};

// Capitaliza a primeira letra
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};