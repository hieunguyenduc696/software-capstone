import { Image } from "antd";

interface TestItemType {
  image: string | undefined
  title: string
  publishDate: string
}

const PreviewTestItem = ({ item }: { item: TestItemType }) => {
  const { image, title, publishDate } = item;
  const handleItemClick = () => {
    console.log("Clicked", image, title, publishDate);
  }
  return (
    <div style={{ display: 'flex', gap: 5, alignItems: 'center', cursor: 'pointer' }} onClick={handleItemClick}>
      <Image style={{ width: 140, height: 120 }} src={image} preview={false} />
      <div style={{ transform: 'translateY(-.5rem)' }}>
        <div style={{ fontSize: '20px' }}>{title}</div>
        <div style={{ fontSize: '15px' }}>Publish {publishDate}</div>
      </div>
    </div>
  );
};

export default PreviewTestItem;
