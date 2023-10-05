import React, { useState, ChangeEvent, FC, useEffect } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import Cookies from 'js-cookie';

import { Layout } from '@/components/layouts';
import axios from 'axios';

interface Props{
    theme:  string
}

const ThemeChangerPage: FC<Props> = ({ theme }) => {

 console.log(theme);
    

 const [currentTheme, setcurrentTheme] = useState(theme);

 const onThemeChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    
    const selectedTheme = event.target.value;
    setcurrentTheme(selectedTheme);

    localStorage.setItem('theme', selectedTheme);
    Cookies.set('theme', selectedTheme);

 };

 useEffect(() => {
   console.log('Storage:', localStorage.getItem('theme'));   
   console.log('Cookies:', Cookies.get('theme'));   
 }, [])

 const onClick = async() => {
    const { data } = await axios.get('/api/hello');
    console.log(data);    
 }
 
 
  return (
    <Layout>
        <Card>
            <CardContent>
                <FormControl>
                    <FormLabel>Tema</FormLabel>
                    <RadioGroup
                        value={ currentTheme }
                        onChange={ onThemeChange }
                    >
                        <FormControlLabel value='light' control={<Radio/>} label="Light"/>
                        <FormControlLabel value='dark' control={<Radio/>} label="Dark"/>
                        <FormControlLabel value='custom' control={<Radio/>} label="Custom"/>
                    </RadioGroup>
                </FormControl>

                <Button
                    onClick={onClick}
                >
                    Solicitud
                </Button>
            </CardContent>
        </Card>
    </Layout>
  )
}

export default ThemeChangerPage;




export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    
    const { theme = 'light', name = 'No name' } = req.cookies;  
    
    const validTheme = ['light', 'dark', 'custom'];


    return {
        props: {
           theme: validTheme.includes(theme) ? theme : 'light',
           name
        }
    }
}