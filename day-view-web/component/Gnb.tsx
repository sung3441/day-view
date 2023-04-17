import styled from "styled-components";

interface Props {
  handleChangeTheme: () => void;
}

const Gnb = ({ handleChangeTheme }: Props) => {
  return (
    <Header>
      <div>
        <div>LOGO</div>
        <div>menu</div>
        <div>
          <button onClick={() => handleChangeTheme()}>색변경</button>
        </div>
      </div>
    </Header>
  );
};
export default Gnb;

const Header = styled.header`
  position: fixed;
  height: 40px;
  width: 100%;
  & > div {
    padding: 14px;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 100px 1fr 1fr;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.color.textColor};
    background-color: ${({ theme }) => theme.color.bgColor};
    box-shadow: 0px 3px 2px 1px ${({ theme }) => theme.color.shadowColor};
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
