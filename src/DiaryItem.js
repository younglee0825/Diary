import React, { useRef, useState } from "react";

export const DiaryItem = ({ id, author, content, create_date, onDelete,onEdit }) => {

    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = ()=>setIsEdit(!isEdit);

    const[localContent, setLocalContent] = useState(content);
    const localContentInput = useRef();

    
    const handleDelete = () =>{
          if (window.confirm(`${id}번째 일기를 삭제하시겠습니까?`)) {
            onDelete(id);
          }
    };

    const handleQuitEdit = ()=>{
        setIsEdit(false);
        setLocalContent(content);
    };
    
    const handleEdit = ()=>{
        if(localContent.length < 10){
            localContentInput.current.focus();
            return;
        }
        if(window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)){
            onEdit(id, localContent);
            toggleIsEdit();
        }
    };


    return (
      <div className="DiaryItem">
        <div className="info">
          <span className="author_info">| 작성자 : {author} |</span>
          <br />
          <span className="date">{new Date(create_date).toLocaleString()}</span>
        </div>
        <div className="content">
            {isEdit
              ?<><textarea ref={localContentInput} value={localContent} 
              onChange={(e)=> setLocalContent(e.target.value)}/></>
              :<>{content}</>
            }
        </div>
        {isEdit 
        ? <>
            <button onClick={handleQuitEdit}>수정 취소</button>
            <button onClick={handleEdit}>수정 완료</button>
          </>
        :<>
            <button onClick={toggleIsEdit}>수정</button>
            <button onClick={handleDelete}>삭제</button>
          </>
        }
      </div>
    );
};
