import React,{ useRef, useState } from "react";
import DiaryEditor from "./DiaryEditor";
import "./App.css";
import { DiaryList } from "./DiaryList";


function App(){
  //일기데이터, 빈 배열로 시작(일기가 없는 상태로 출발)
  const [data, setData] = useState([]);
  //데이터 추가될 때마다 id가 +1이 되어 추가되도록,
  //useRef를 통해 변수처럼 사용할 고유 id 생성
  //0번 index부터 시작
  const dataId = useRef(0);

  const onEdit =(targetId, newContent)=>{
    setData(
        data.map((item)=>
        item.id == targetId
            //컨텐츠가 뉴컨텐츠로 바뀜(수정된 배열)로 교체해줄 것인지
            ?{...item, content: newContent}

            //수정대상이 아니면 원래있던 배열을 다시 반환할 것인지
            :item
        )
    );
  };
  //새로운 일기를 추가하는 함수
  const onCreate = (author, content) => {
    const create_date = new Date().getTime(); //현재 시간 구하기
    const newItem = {
      author,
      content,
      create_date,
      id: dataId.current,
    };
    dataId.current += 1;

    //원래 data를 spread 연산자로 쓰고 (원래 배열에 있던 data를 여기에)
    //새로운 아이템을 추가하고 원래 데이터를 이어붙이는 형태
    setData([newItem, ...data]);
  };
  // targetId : 어떤 id를 갖고있는 요소를 지우길 원하는지 매개변수로 전달 받음
  const onDelete = (targetId) => {
    console.log(`${targetId}번째 일기가 삭제되었습니다.`);
    const newDiaryList = data.filter((item)=>item.id !== targetId);
    setData(newDiaryList);
  };

  return (
    <>
      <DiaryEditor onCreate={onCreate} /> {/*새 일기 추가를 prop으로 내려줌*/}
      <DiaryList onDelete={onDelete} onEdit={onEdit} diaryList={data} />{" "}
      {/*data를 prop으로 내려준다.  */}
    </>
  );
};

export default App;
