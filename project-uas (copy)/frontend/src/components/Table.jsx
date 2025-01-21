import Button from "./Button";

export default function Table({ children }) {
  return (
    <table className="w-full text-center border-collapse">
      <thead className="border-2 border-black">
        <tr className="bg-gray-300">
          <th className="p-2.5 border-2 border-black">Nama</th>
          <th className="p-2.5 border-2 border-black">Harga</th>
          <th className="p-2.5 border-2 border-black">Kategori</th>
          <th className="p-2.5 border-2 border-black">Jumlah Stok</th>
          <th className="p-2.5 border-2 border-black">Aksi</th>
        </tr>
      </thead>
      <tbody className="border-2 border-black">{children}</tbody>
    </table>
  );
}

export const TableBody = ({
  nama,
  harga,
  kategori,
  jumlahStok,
  handleDelete,
  handleEdit,
}) => {
  return (
    <tr className="bg-white">
      <td className="p-2.5 border-2 border-black">{nama}</td>
      <td className="p-2.5 border-2 border-black">{harga}</td>
      <td className="p-2.5 border-2 border-black">{kategori}</td>
      <td className="p-2.5 border-2 border-black">{jumlahStok}</td>
      <td className="p-2.5 border-2 border-black">
        <Button
          text="Ubah"
          style="bg-yellow-500 hover:bg-yellow-600"
          handleClick={handleEdit}
        />
        <Button
          text="Hapus"
          style="bg-red-500 hover:bg-red-600 ml-4"
          handleClick={handleDelete}
        />
      </td>
    </tr>
  );
};
