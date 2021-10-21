import styles from "./styles.module.scss";

import logoImg from "../../assets/logo.svg";

export function MessageList() {
  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {Array(3)
          .fill(0)
          .map(() => (
            <li className={styles.message}>
              <p className={styles.messageContent}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>

              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img
                    src="https://github.com/andersoncrocha.png"
                    alt="Anderson Rocha"
                  />
                </div>

                <span>Anderson Rocha</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
