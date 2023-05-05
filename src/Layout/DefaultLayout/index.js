
import { Layout } from 'antd';
import React from 'react';
import Sidebar from '../component/Sidebar/Sidebar';
import Nav from '../component/Nav/Nav';
const { Content } = Layout;

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Layout hasSider>
                <Sidebar  />
                <Layout className="site-layout" style={{ marginLeft: 250, }}>
                    <Nav />
                    <Content>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default DefaultLayout



