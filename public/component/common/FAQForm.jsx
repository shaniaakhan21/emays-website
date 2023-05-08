import { Grid, Column as Col, Search, Tag, Accordion, AccordionItem } from '@carbon/react';
import React, { useEffect, useMemo, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

// SCSS
import './../../scss/component/retailer/faq.scss';
import { getAll } from '../../services/faq';
// Components

// Images

const FAQForm = () => {
    const [translate] = useTranslation();
    const t = (key) => translate(`common.faq.${key}`);

    const [data, setData] = useState();
    const [search, setSearch] = useState('');

    const filteredData = useMemo(
        () => data?.filter(
            ({ question }) => question.toLowerCase().includes(search.toLowerCase())
        ), [data, search]
    );

    const loadData = async () => {
        const response = await getAll();
        setData(response);
    };

    useEffect(() => {
        AOS.init();
        loadData();
    }, []);

    return (
        <Grid fullWidth className='faq'>
            <Col lg={16} md={8} sm={4} xs={4} data-aos='fade-in' data-aos-easing='linear' data-aos-duration='1000'>
                <h1 className='header'>{t('title')}</h1>
            </Col>
            <Col lg={16} md={8} sm={4} xs={4} data-aos='fade-in' data-aos-easing='linear'
                data-aos-duration='1000' data-aos-delay='300' >
                <Search onChange={e => setSearch(e.target.value)} className='search' />
            </Col>
            <Col lg={16} md={16} sm={4} xs={4} className='list list-2' data-aos='fade-in'
                data-aos-easing='linear' data-aos-duration='1000' data-aos-delay='700'>
                <Accordion>
                    {filteredData?.map?.(({ question, answer }) => (
                        <AccordionItem title={question}>{answer}</AccordionItem>))}
                </Accordion>
            </Col>
        </Grid>
    );
};

FAQForm.propTypes = {};

export default FAQForm;
