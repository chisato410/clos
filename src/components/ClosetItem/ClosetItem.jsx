export default function ClosetItem({ item }) {
  return <div>{item.imageUrl && <img src={item.imageUrl} alt="" />}</div>;
}
