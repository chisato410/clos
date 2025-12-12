export default function ClosetList({ items }) {
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          {item.imageUrl && <img src={item.imageUrl} alt="" />}
        </div>
      ))}
    </div>
  );
}
