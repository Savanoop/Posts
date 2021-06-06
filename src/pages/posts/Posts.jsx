import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Layout,
  Table,
  Input,
  Button,
  Space,
  Typography,
  Modal,
  Pagination,
} from 'antd';
import { PoweroffOutlined, SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Highlighter from 'react-highlight-words';
import { useHistory } from "react-router";
import { fakeAuth } from '../../helper/auth';
import InfiniteScroll from "react-infinite-scroll-component";

const { Header, Content, Footer } = Layout;
const TextTitle = Typography.Title;

function Posts(props) {
  const [posts, setPosts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null)
  const searchInput = useRef();
  const history = useHistory()

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(post => {
        const posts = post.map((item) => {
          return { ...item, key: item.id };
        })
        setPosts(posts)
      })
  }, [])

  const onLogout = useCallback(() => {
    fakeAuth.signout(() => history.push('/'))

  }, [])

  const handleCancel = () => {
    setSelectedData(null)
    setIsModalVisible(false);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('')
  };
  const onSelectPost = (event, record, rowIndex) => {
    setIsModalVisible(true);
    setSelectedData(record)

  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput && searchInput.current && searchInput.current.select(), 100);
      }
    },
    onclick: () => onSelectPost(),
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: '20%',
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '30%',
      ...getColumnSearchProps('title'),
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
      ...getColumnSearchProps('body'),
    },
  ];
  return (
    <div className='posts'>
      <Layout className="layout">
        <Header>
          <div style={{ textAlign: 'center' }}>
            <TextTitle style={{ color: '#ffffff', marginTop: '14px' }} level={3}>Posts</TextTitle>
            <span style={{ float: 'right', marginTop: -57 }}>
              <Button
                type="primary"
                icon={<PoweroffOutlined />}
                onClick={onLogout}
              >
                log out
              </Button>
            </span>
          </div>
        </Header>
        <Table
          columns={columns}
          dataSource={posts}
          bordered
          pagination={false}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => onSelectPost(event, record, rowIndex),
            };
          }} />
      </Layout>
      <Modal title="" visible={isModalVisible} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} onCancel={handleCancel}>
        <h3> {selectedData && selectedData.title} </h3>
        <p>{selectedData && selectedData.body}</p>
      </Modal>
    </div>
  )
}

export default Posts
