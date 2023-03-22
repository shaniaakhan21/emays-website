import { Grid, Column as Col, Search, Tag, Accordion, AccordionItem } from '@carbon/react';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

// SCSS
import './../../scss/component/retailer/faq.scss';
// Components

// Images

// Constants
const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt' +
    ' ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
    'laboris nisi ut aliquip ex ea commodo consequat.';

const FAQForm = () => {
    const [translate] = useTranslation();
    
    const t = (key) => translate(`common.faq.${key}`);

    useEffect(() => {
        AOS.init();
    }, []);
    
    return (
        <Grid fullWidth className='faq'>
            <Col lg={16} md={8} sm={4} xs={4} data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000' >
                <h1 className='header'>{t('title')}</h1>
            </Col>
            <Col lg={16} md={8} sm={4} xs={4} data-aos='fade-in' data-aos-easing='linear' 
                data-aos-duration='1000' data-aos-delay='300' >
                <Search className='search' />
            </Col>
            <Col lg={16} md={8} sm={4} xs={4} className='tags' 
                data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000' data-aos-delay='500'>
                <Tag className='tag' filter onClose={() => {}}>Payment</Tag>
                <Tag className='tag' filter onClose={() => {}}>Payment</Tag>
                <Tag className='tag' filter onClose={() => {}}>Payment</Tag>
                <Tag className='tag' filter onClose={() => {}}>Payment</Tag>
                <Tag className='tag' filter onClose={() => {}}>Payment</Tag>
            </Col>
            <Col lg={8} md={8} sm={4} xs={4} className='list' data-aos='fade-in' 
                data-aos-easing='linear' data-aos-duration='1000' data-aos-delay='700' >

                <Accordion>
                    <AccordionItem title='Where is this service available?'>{text}</AccordionItem>
                    <AccordionItem title='How do I place my order'>{text}</AccordionItem>
                    <AccordionItem title='When can I book my appontment?'>{text}</AccordionItem>
                    <AccordionItem title='Who Brings the pieces I want to try on?'>{text}</AccordionItem>
                    <AccordionItem title='How do I pay'>{text}</AccordionItem>
                    <AccordionItem title='What if I don’t want to keep the pieces'>{text}</AccordionItem>
                </Accordion>
            </Col>
            <Col lg={8} md={8} sm={4} xs={4} className='list list-2' data-aos='fade-in' 
                data-aos-easing='linear' data-aos-duration='1000' data-aos-delay='700' >
                <Accordion>
                    <AccordionItem title='Where is this service available?'>{text}</AccordionItem>
                    <AccordionItem title='How do I place my order'>{text}</AccordionItem>
                    <AccordionItem title='When can I book my appontment?'>{text}</AccordionItem>
                    <AccordionItem title='Who Brings the pieces I want to try on?'>{text}</AccordionItem>
                    <AccordionItem title='How do I pay'>{text}</AccordionItem>
                    <AccordionItem title='What if I don’t want to keep the pieces'>{text}</AccordionItem>
                </Accordion>
            </Col>
        </Grid>
    );
};

FAQForm.propTypes = {

};

export default FAQForm;
