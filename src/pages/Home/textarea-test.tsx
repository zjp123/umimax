import React, { useState } from 'react';

const InputBox = () => {
  const [inputValue, setInputValue] = useState(''); // 输入框的内容
  const [isComposing, setIsComposing] = useState(false); // 是否处于中文输入状态
  // const [status, setStatus] = useState(""); // 保存状态显示

  // 模拟向服务器保存数据的函数
  // const saveToServer = async (content) => {
  //   try {
  //     console.log(`保存内容到服务器: ${content}`);
  //     // 假设这是一个简单的 POST 请求
  //     const response = await fetch("/save-content", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ content }),
  //     });

  //     if (response.ok) {
  //       setStatus("保存成功");
  //     } else {
  //       setStatus("保存失败，请重试");
  //     }
  //   } catch (error) {
  //     setStatus("保存失败，请检查网络");
  //     console.error("保存失败:", error);
  //   }
  // };

  // 输入事件处理
  const handleChange = (e: any) => {
    const value = e.target.value;
    setInputValue(value);
    if (isComposing) {
      return;
    }
    // 如果不是中文输入法状态，直接保存到服务器
    if (!isComposing) {
      // saveToServer(value);
    }
  };

  // 中文输入法开始
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  // 中文输入法结束
  const handleCompositionEnd = () => {
    console.log('ppppp');
    setIsComposing(false);
    // const value = e.target.value;
    // saveToServer(value); // 在中文输入法完成后保存
  };

  return (
    <div>
      <textarea
        value={inputValue}
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        placeholder="请输入内容..."
        style={{ width: '100%', height: '100px', fontSize: '16px' }}
      />
      <p>{status}</p>
    </div>
  );
};

export default InputBox;
