import React, { useState, useEffect } from 'react';
import styles from './modal.css';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const Moda = (props) => {
  const [formData, setFormData] = useState({ grpName: '', color: '' });

  const setGroups = props.setGroups;
  const groups = props.groups;
  const color = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];

  const getScreen = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const [screenSize, setScreenSize] = useState(getScreen());

  useEffect(() => {
    const Screen = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener('resize', Screen);
    return () => window.removeEventListener('resize', Screen);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeColor = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.getAttribute('color'),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.color === '') {
      alert('Please select a color');
      return;
    }
    let newGroup = [
      ...groups,
      {
        groupName: formData.grpName,
        color: formData.color,
        notes: [],
        id: groups.length,
      },
    ];
    setGroups(newGroup);
    localStorage.setItem('groups', JSON.stringify(newGroup));
    props.closeModal(false); // Close modal after creating group
  };

  return (
    <div>
      <Modal open={true} onClose={() => props.closeModal(false)} center>
        {screenSize.width < 989 ? (
          <div className={styles.modalBackgroundMobile}>
            <div className={styles.modalContainerMobile}>
              <span>
                {/* <button className={styles.closeButtonMobile} onClick={() => props.closeModal(false)}>
                  X
                </button> */}
              </span>
              <h2 className={styles.modalHeading}>Create New Group</h2>
              <label className={styles.modalGrp}>Group Name</label>
              <input
                type="text"
                className={styles.modalTextMobile}
                name="grpName"
                placeholder="Enter your group name"
                onChange={handleChange}
              />
              <br />
              <label className={styles.modalColor}>Choose Colour</label>
              <div className={styles.Choosecolour}>
                {color.map((color, index) => (
                  <button
                    className={`${styles.colorButton} ${formData.color === color ? 'selected' : ''}`}
                    name="color"
                    color={color}
                    key={index}
                    id={color}
                    style={{
                      height: '40px',
                      width: '40px',
                      background: color,
                      borderRadius: '25px',
                      border: formData.color === color ? '3px solid #000' : 'none',
                      margin: '10px',
                    }}
                    onClick={handleChangeColor}
                  ></button>
                ))}
              </div>
              <button className={styles.modalCreateMobile} onClick={handleSubmit}>
                Create
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
              <span>
                {/* <button className={styles.closeButton} onClick={() => props.closeModal(false)}>
                  X
                </button> */}
              </span>
              <h2 className={styles.modalHeading}>Create New Group</h2>
              <label className={styles.modalGrp}>Group Name</label>
              <input
                type="text"
                className={styles.modalText}
                name="grpName"
                placeholder="Enter your group name"
                onChange={handleChange}
              />
              <br />
              <label className={styles.modalColor}>Choose Colour</label>
              <div className={styles.Choosecolour}>
                {color.map((color, index) => (
                  <button
                    className={`${styles.colorButton} ${formData.color === color ? 'selected' : ''}`}
                    name="color"
                    color={color}
                    key={index}
                    id={color}
                    style={{
                      height: '40px',
                      width: '40px',
                      background: color,
                      borderRadius: '25px',
                      border: formData.color === color ? '3px solid #000' : 'none',
                      margin: '10px',
                    }}
                    onClick={handleChangeColor}
                  ></button>
                ))}
              </div>
              <button className={styles.modalCreate} onClick={handleSubmit}>
                Create
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Moda;
