import React from 'react'
import { Input } from 'antd'
// import { CURRENCY } from '../../constants/params'
// import axios from 'axios'

const ToModal = () => {
  const { Search } = Input
  const onSearch = (value) => console.log(value)
  // const [selectedRowKeys, setSelectedRowKeys] = useState(['name','balance'])
  // const [data, setData] = useState([])
  // const [params, setParams] = useState({
  //   skip: 0,
  //   limit: 10,
  //   currency: CURRENCY
  // })

  // useEffect(() => {
  //   const getData = async() => {
  //     axios.get('coinPriceService/coins/info?skip=0&limit=10')
  //       .then(res => setData(res.data?.data))
  //       .catch(error => error)
  //   }
  //   getData()
  // }, [params])

  // console.log('DATAAAAA', data)

  // const items = [
  //   {
  //     key: 'name',
  //     title: 'name'
  //   },
  //   {
  //     key: 'balance',
  //     title: 'balance'
  //   }
  // ]

  // const columns = [
  //   {
  //     title: 'name',
  //     render: (_, record) => (
  //     <div>
  //       <img src={record.coin_image} alt={record.coin_name}/>
  //       <div className=''></div>
  //     </div>
  //     )
  //   }
  // ]

  return (
    <div className='to-modal'>
      <div className='to-modal__title'>Select Coin</div>
      <div className='to-modal__search-bar'>
        <Search
          placeholder='input search text'
          onSearch={onSearch}
          enterButton />
      </div>
      <div className='to-modal__coins--list'>
        List coins updating ...
      </div>
    </div>
  )
}

export default ToModal
