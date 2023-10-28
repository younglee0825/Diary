import React from 'react'
import { DiaryItem } from "./DiaryItem";


export const DiaryList = ({onDelete ,onEdit, diaryList=[]}) => {
  return (
    <div className="DiaryList">
      <h3>일기 리스트</h3>
      <h4>{diaryList.length} 개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((item)=>(
           <DiaryItem key={item.id}{...item} onDelete={onDelete} onEdit={onEdit}/>
        ))}
      </div>
    </div>
  );
};
