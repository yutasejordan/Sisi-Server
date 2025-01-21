const ProductsCard = ({ kategori, harga, nama, stok, button }) => {
  return (
    <div className="w-[700px] bg-white rounded-xl shadow-md">
      <div className="p-6">
        <h3 className="uppercase text-2xl text-center font-semibold">{nama}</h3>
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg">Jumlah Stok</p>
          <p className="text-lg">{stok}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg">Kategori</p>
          <h1 className="text-lg">{kategori}</h1>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg">Harga</p>
          <p className="text-lg">{harga}</p>
        </div>
        <div className="flex gap-2 mt-4">{button}</div>
      </div>
    </div>
  );
};

export default ProductsCard;
