import { useEffect, useState, useContext } from 'react';
import { fetchMyListMovies } from '../services/movies';
import { Card, List, Row, Col, Spin, Button } from 'antd';
import { MovieContext } from '../components/context';
import { Link } from "react-router-dom";
import { Types } from '../reducers/reducer_movies';

const { Meta } = Card;

function MyListMovies() {
    const { dataMovies, dispatch } = useContext(MovieContext); 
    const [loading, setLoading] = useState(false);   
    const pathImage = 'https://image.tmdb.org/t/p/w185';

    useEffect(() => {
        
        fmylistMovies();

    }, []);

    const fmylistMovies = async () => {
        setLoading(true);
        try { 
            const data = await fetchMyListMovies();

            if (data) {
                dispatch({type: Types.ListMovies, payload: data});
                console.log(data);                
            }  else {
                console.log("No hay peliculas en mi lista");
            }
            setLoading(false);

        } catch (error) {
            console.log(error);
        } 
    } 

    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <h4 style={{marginTop: '20px',}}>Mi Lista de Peliculas</h4>                
                    <Spin size="large" spinning={loading}>
                         <div id="scrollableDiv"
                                style={{
                                        height: 520,
                                        overflow: 'auto',
                                        padding: '0 16px',
                                        border: '1px solid rgba(140, 140, 140, 0.35)',
                                        marginTop: '20px',
                                        paddingTop: '20px',
                                        paddingBottom: '20px'
                                }}>
                            <List
                                grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
                                pagination={{                                   
                                    pageSize: 20,
                                    total: dataMovies && dataMovies?.totalPages > 10000 ? 10000 : dataMovies?.totalPages
                                }}
                                dataSource={dataMovies?.results}
                                renderItem={item => (
                                    <List.Item>
                                        <Card                                    
                                            hoverable
                                            style={{ width: 240 }}
                                            cover={<img src={pathImage+item.posterPath} alt='poster' />}
                                        >
                                            <Meta title={item.title} description={'Estreno: '+item.releaseDate} />
                                        </Card>
                                    </List.Item>
                                )}
                            />            
                        </div>                                                  
                    </Spin>
            </Col>                          
            <Col xs={24} sm={24} md={11} lg={11} xl={11} xxl={11}>
                <Link to={'/search'}>
                    <Button type="primary" block>
                        Retornar
                    </Button>
                </Link>
            </Col> 
        </Row>
    )

}
export default MyListMovies;            