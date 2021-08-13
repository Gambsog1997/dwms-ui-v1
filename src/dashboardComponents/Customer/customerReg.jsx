import { Layout } from "antd";
import {
  WhatsAppOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import RegistrationFormCustomer from "./registration";

const { Header, Content } = Layout;

const CustomerReg = () => {
  return (
    <div>
      <Layout>
        <Header
          style={{
            backgroundColor: "teal",
          }}
        >
          <div
            style={{
              color: "white",
            }}
          >
            <div
              style={{
                float: "right",
              }}
            >
              Contact Us
              <span>
                {
                  <WhatsAppOutlined
                    style={{
                      marginLeft: 15,
                      marginRight: 15,
                    }}
                  />
                }
                {
                  <TwitterOutlined
                    style={{
                      marginRight: 15,
                    }}
                  />
                }
                {
                  <InstagramOutlined
                    style={{
                      marginRight: 15,
                    }}
                  />
                }
              </span>
            </div>
          </div>
        </Header>
        <Content>
          <RegistrationFormCustomer />
        </Content>
      </Layout>
    </div>
  );
};

export default CustomerReg;
