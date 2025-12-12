export default function ItemDetailSection({ item }) {
  if (!item) return null;

  return (
    <div>
      <img src={item.imageUrl} alt="" />
      <div>タグやメモは後で追加</div>
    </div>
  );
}
