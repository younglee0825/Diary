import React, { useRef, useState } from 'react';
import "./App.css";


export default function DiaryEditor({onCreate}) {
    const[state, setState] =useState({
        author:"",
        content:"",
    });
    //focus - 상수 2개 생성
    const authorInput = useRef();
    const contentInput = useRef();

    const handleChangeState =(e)=>{
        setState(
            {
                ...state,
                [e.target.name] : e.target.value,
            }
        );
    }
    //저장 버튼
    const handleSubmit =()=>{
      if(state.author.length < 1){
        // alert("작성자는 최소 1글자 이상 입력해주세요.");
        authorInput.current.focus();
        return;
      }

      if(state.content.length < 10){
        // alert("일기 본문은 최소 10글자 이상 입력해주세요.");
        contentInput.current.focus();
        return;
      }
        onCreate(state.author,state.content);
        alert("오늘의 일기가 저장되었습니다. ");
        setState({
            author:"",
            content:"",
        });
    };
    

  return (
    <div className="editor">
      <h3>오늘의 일기</h3>
      <input
        ref={authorInput}
        name="author"
        value={state.author}
        onChange={handleChangeState}
      />
      <span className="note"> 작성자를 입력하세요(최소 1글자 이상)</span>

      <textarea
        ref={contentInput}
        name="content"
        value={state.content}
        onChange={handleChangeState}
      />
      <span className="note"> 일기 본문을  입력하세요(최소 10글자 이상)</span>
      <div>
        <button onClick={handleSubmit}>일기 저장</button>
      </div>
    </div>
  );
}
