export default function MemoList({ memos }) {
  return (
    <div>
      {memos.map((memo) => (
        <div key={memo.id}>{memo.text}</div>
      ))}
    </div>
  );
}
