import Head from "next/head";
import { useCallback, useState } from "react";
import button from "styles/button.module.scss";
import container from "styles/container.module.scss";
import input from "styles/input.module.scss";
import list from "styles/list.module.scss";

const Home = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const handleInput = useCallback((e) => {
    setTodoText(() => e.target.value);
  });

  const handleAdd = useCallback(() => {
    if (!todoText) return false;
    setIncompleteTodos((prevIncompleteTodos) => [...prevIncompleteTodos, todoText]);
    setTodoText("");
  }, [todoText]);

  const handleDelete = useCallback(
    (index) => {
      const newTodos = [...incompleteTodos];
      newTodos.splice(index, 1);
      setIncompleteTodos(newTodos);
    },
    [incompleteTodos]
  );

  const handleComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    setIncompleteTodos(newIncompleteTodos);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setCompleteTodos(newCompleteTodos);
  };

  const handleBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    setCompleteTodos(newCompleteTodos);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <Head>
        <title>React TODO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={container["container--input"]}>
        <input className={input.input} type="text" placeholder="TODOを入力" value={todoText} onChange={handleInput} />
        <button className={button.button} onClick={handleAdd}>
          追加
        </button>
      </div>

      <div className={container["container--incomplete"]}>
        <span className={container["container__title"]}>未完了のTODO</span>
        <ul className={list.list}>
          {incompleteTodos.map((item, index) => {
            return (
              <li className={list["list__item"]} key={item}>
                <span className={list["list__title"]}>{item}</span>
                <button className={button.button} onClick={() => handleComplete(index)}>
                  完了
                </button>
                <button className={button.button} onClick={() => handleDelete(index)}>
                  削除
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={container["container--complete"]}>
        <span className={container["container__title"]}>完了のTODO</span>
        <ul className={list.list}>
          {completeTodos.map((item, index) => {
            return (
              <li className={list["list__item"]} key={item}>
                <span className={list["list__title"]}>{item}</span>
                <button className={button.button} onClick={() => handleBack(index)}>
                  戻す
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Home;
