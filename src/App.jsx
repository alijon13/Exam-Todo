import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";


import "./App.css";
let api = "  http://localhost:3000/data";

function App() {
  const [count, setCount] = useState(0);
  let [idx ,setIdx] = useState(null);
  let [getdata, setGetdata] = useState([]);
  let [check, setCheck] = useState(false)
  const [open, setOpen] = useState(false);
  let [inputTitle, setInputTitle] = useState("");
  let [inputAbout, setInputAbout] = useState("");
  let [inputTitleE, setInputTitleE] = useState("");
  let [inputAboutE, setInputAboutE] = useState("");
  let [inputCearch, setInputCearch] = useState("")
   const [modal1Open, setModal1Open] = useState(false);
  //________________get____________________
  async function get() {
    try {
      let { data } = await axios.get(api);
      setGetdata(data);
    } catch (error) {
      console.error(error);
    }
  }
  //________________delete____________________
  async function deleteUser(id) {
    try {
      let { data } = await axios.delete(`${api}/${id}`);
      get();
    } catch (error) {
      console.error(error);
    }
  }
  //________________check_________________
  function checkUser(id) {
    setGetdata(
      getdata.map((element) => {
        if (element.id == id) {
          element.complite = !element.complite;
        }
        return element;
      })
     
    )
  }
  //________________cearch____________________
  async function search() { 
    try {
      let { data } = await axios.get(`${api}/?q=${inputCearch}`)
      setGetdata(data)
    } catch (error) {
      console.error(error);
    }
  }
// ___________________add___________________
  async function addUser() {
    if (inputTitle == "" || inputAbout == "") { 
      return alert("Please fill all fields");
    }
    try {
      let { data } = await axios.post(api, {
        title: inputTitle,
        about: inputAbout,
      });
      get();
      setInputAbout("")
      setInputTitle("")
      setOpen(false)
    } catch (error) {
      console.error(error);
    }
  }
  //_________________edit___________________
  async function editUser(id, obj) { 
    try {
      let { data } = await axios.put(`${api}/${id}`, obj);
      get()
    setModal1Open(false);
    } catch (error) {
      console.error(error);
    }
  }
  function save() { 
    let obj = {
      title: inputTitleE.trim(),
      about: inputAboutE.trim()
    }
    editUser(idx, obj)

  }
  function showEdit(element) { 
    setModal1Open(true);
    setInputTitleE(element.title)
    setInputAboutE(element.about)
    setIdx(element.id)

  }
  function cancel() { 
    setInputTitle("")
    setInputAbout("")
    setOpen(false)
    setModal1Open(false)
    

  }
  useEffect(() => {
    get();
  }, []);
  return (
    <div className="bg-[#ffffff] w-[100%] h-[100vh] flex flex-col justify-around items-center">
      <div className="w-[98%] h-[95%]  flex justify-between items-center">
        <div className="w-[326px]  h-[85%]  flex flex-col justify-between items-center">
          <h1 className="text-[60px] text-center text-[#808080]">T O D O</h1>
          <div className="w-[60%] h-[400px] flex flex-col justify-around items-center">
            <div className="flex justify-around  w-[100%] items-center">
              <div>
                <img src="/src/assets/Ellipse 1 (4).png" alt="" />
              </div>
              <h1 className="text-[40px] text-[gray]">work</h1>
            </div>
            <div className="flex justify-around  w-[100%] items-center">
              <div>
                <img src="/src/assets/Ellipse 2.png" alt="" />
              </div>
              <h1 className="text-[40px] text-[gray]">Stydy</h1>
            </div>
            <div className="flex justify-around  w-[100%] items-center">
              <div>
                <img src="/src/assets/Ellipse 3 (1).png" alt="" />
              </div>
              <h1 className="text-[40px] text-[gray]">enter</h1>
            </div>
            <div className="flex justify-around  w-[100%] items-center">
              <div>
                <img src="/src/assets/Ellipse 1 (4).png" alt="" />
              </div>
              <h1 className="text-[40px] text-[gray]">family</h1>
            </div>
          </div>
          <div className="flex justify-around  items-center w-[60%]">
            <input type="checkbox" />
            <h1 className="text-[#6b6262] ">Hide done task</h1>
          </div>
        </div>
        <div className="w-[76%]  h-[85%]  flex flex-col   ">
          <div className="flex  justify-end">
            <Input
              style={{
                height: "40px",
                marginTop: "16px",
                width: "1340px",
                fontSize: "20px",
              }}
              placeholder="large size"
              value={inputCearch}
              onChange={(e) => setInputCearch(e.target.value)}
              prefix={<UserOutlined />}
              onInput={() => search()}
            />

            <AddIcon
              type="primary"
              onClick={() => setOpen(true)}
              style={{ fontSize: 70, color: "gray" }}
            />

            <Modal
              title="T A S K"
              open={open}
              onOk={() => addUser()}
              onCancel={() => cancel()}
              width={1000}
            >
              <div className="  w-[90%] flex  flex-col justify-around items-start h-[500px]">
                <h1 className="text-[40px]">T i t l e</h1>
                <input
                  value={inputTitle}
                  onChange={() => setInputTitle(event.target.value)}
                  type="text"
                  className="m-auto  w-[90%] border border-[gray] text-[20px] h-[6vh] pl-[20px] rounded-[7px] outline-none"
                  placeholder="Placeholder text"
                />
                <div className="text-start  ">
                  <h1 className="text-[35px]">D e s c r i p t i o n</h1>
                </div>
                <input
                  value={inputAbout}
                  onChange={() => setInputAbout(event.target.value)}
                  type="text"
                  className="m-auto  border border-[gray] w-[90%] outline-none  pl-[20px] text-[23px] h-[17vh] rounded-[7px]"
                  placeholder="Placeholder text"
                />
              </div>
            </Modal>
          </div>
          <div className="w-[100%]  clear-left mt-[38px] flex  justify-around flex-wrap  overflow-y-auto  ">
            {getdata.map((element) => {
              return (
                <div key={element.id} className="">
                  <div className="bg-[#ffb87a]  border border-[gray] mt-[60px] flex flex-col justify-between  p-[10px] rounded-[10px] ml-[10px] w-[600px]  h-[300px]">
                    <h1
                      style={{ textDecoration: element.complite ? "line-through" :null }}
                      className="text-[40px]"
                    >
                      {element.title}
                    </h1>
                    <h1 className="text-[26px] w-[90%]">{element.about}</h1>
                    <div className="] flex  justify-between items-center w-[100%] p-[10px]">
                      <div className=" flex justify-around w-[20%]">
                        <div onClick={() => showEdit(element)}>
                          {" "}
                          <EditIcon style={{ fontSize: 40 }} />
                        </div>
                        <Modal
                          width={900}
                          centered
                          title="EDITE USER "
                          style={{
                            top: 20,
                          }}
                          open={modal1Open}
                          onOk={() => save(element)}
                          onCancel={() => cancel()}
                        >
                          <div className="  w-[90%] flex  flex-col justify-around items-start h-[500px]">
                            <h1 className="text-[40px]">T i t l e</h1>
                            <input
                              value={inputTitleE}
                              onChange={() =>
                                setInputTitleE(event.target.value)
                              }
                              type="text"
                              className="m-auto  w-[90%] border border-[gray] text-[20px] h-[6vh] pl-[20px] rounded-[7px] outline-none"
                              placeholder="Placeholder text"
                            />
                            <div className="text-start  ">
                              <h1 className="text-[35px]">
                                D e s c r i p t i o n
                              </h1>
                            </div>
                            <input
                              value={inputAboutE}
                              onChange={() =>
                                setInputAboutE(event.target.value)
                              }
                              type="text"
                              className="m-auto  border border-[gray] w-[90%] outline-none  pl-[20px] text-[23px] h-[17vh] rounded-[7px]"
                              placeholder="Placeholder text"
                            />
                          </div>
                        </Modal>
                        <div onClick={() => deleteUser(element.id)}>
                          <DeleteIcon style={{ fontSize: 40, color: "red" }} />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input
                          checked={element.complite}
                          onChange={(event) => checkUser(element.id)}
                          type="checkbox"
                          className="w-[20px] h-[20px]"
                        />
                        <h1 className="ml-[10px] text-[20px]">done</h1>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
