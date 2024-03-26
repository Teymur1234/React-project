import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProducts, deleteProduct, editProduct, fetchProducts } from '../../slice/ProductSlice'
import "./adminPage.css"
import { Box, Button, Modal, Typography } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  display:'flex',
  p: 4,
  flexDirection:'column',
  gap:'5px'
};

const AdminPage = () => {
    const dispatch=useDispatch()
    const products=useSelector(state=>state.products.items)
    useEffect(()=>{
        dispatch(fetchProducts())
    },[dispatch])
    console.log(products);
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [id,setId]=useState(null)

    const handleOpen1=(product)=>{
      setOpen(true)
      setProduct(product)
      setId(product.id)
    }

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {setProduct({...product,image:reader.result})}
        reader.readAsDataURL(file)
      }
    }
  
    const changeName=(e)=>{
      setProduct({...product,name:e.target.value})
    }
       
    const [product,setProduct]=useState({
      image:"",
      name:"",
      price:0,
      count:1
    })
    const changePrice=(e)=>{
      setProduct({...product, price: e.target.value})
    }
    const saveProduct=()=>{
      if (id) {
        dispatch(editProduct({id:id,product:product}))
      }
      else{
         dispatch(addProducts(product))
      }
      setProduct({...product,image:"", name:"", price:0, count:1})
      setId(null)
    }
    const deletedProduct=(id)=>{
      dispatch(deleteProduct(id))
    }

  return (
    <>
   <Button onClick={handleOpen}>Add Product</Button>
   <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Product Image
          </Typography>
          <input type="file" onChange={handleImageChange} />
          {product.image && <img src={product.image} alt="" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
          <input type="text" placeholder='Product name' value={product.name} onChange={changeName} />
          <input className='price-input' type="number" value={product.price} onChange={changePrice}/>
          <button className='save-products' onClick={()=>saveProduct()}>Save Product</button>
        </Box>
      </Modal>

    <div className='products-divs'>
    {products && products.map(product=>(
            <div key={product.id} className='product-divs'>
                <img src={product.image} alt="" />
                <h3>{product.name}</h3>
                <div className=''>
                <p>£{product.price}</p>
                <Button onClick={()=>handleOpen1(product)}>Edit Product</Button>
                <button onClick={()=>deletedProduct(product.id)}>Delete Product</button>
             </div>
            </div>
          ))}
    </div>
    </>
 )
}

export default AdminPage