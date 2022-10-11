import { useEffect, useState, useContext } from 'react';
import { fetchListMovies, fetchMovies, fetchScore, fetchTokenGuess } from '../services/movies';
import { IMovie } from '../services/movies';
import { Card, List, Input, Button, Row, Col, Modal, Descriptions, InputNumber, Divider, Spin, Form, notification } from 'antd';
import { Types } from '../reducers/reducer_movies';
import { MovieContext } from '../components/context'
import { Link } from "react-router-dom";
import 'antd/dist/antd.min.css';

const { Meta } = Card;
const { Search } = Input;

function ListMovies() {
    const { dataMovies, dispatch } = useContext(MovieContext);
    const pathImage = 'https://image.tmdb.org/t/p/w185';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataMovie, setDataMovie] = useState<IMovie>();
    const [loading, setLoading] = useState(false);
  
    const showMovieDetail = (data: IMovie) => {
      setIsModalOpen(true);
      setDataMovie(data);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    useEffect(() => {

        if (!window.sessionStorage.WEBMOV01TK)
            fetchTokenGuess();
        flistMovies(1);

    }, []);

    const flistMovies = async (page: number) => {
        setLoading(true);
        try { 
            const data = await fetchListMovies(page);

            if (data) {
                dispatch({type: Types.ListMovies, payload: data});
                console.log(data);                
            }  else {
                console.log("No hay Datos");
            }
            setLoading(false);

        } catch (error) {
            console.log(error);
        } 
    }    

    const fSearchMovie = async (value: string) => {
        if (value === "") return;
        setLoading(true);
        try {
            const data = await fetchMovies(value);

            if (data) {
                dispatch({type: Types.ListMovies, payload: data});
                console.log(data);
            }  else {
                console.log("No hay Datos");
            }
            setLoading(false);

        } catch (error) {
            console.log(error);
        }       
    }

    const onChangeBlanck = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.value === "") flistMovies(1);
      };

    return (
        <div >
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <h4 style={{marginTop: '20px',}}>Listado de Peliculas</h4>
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
                                onChange: page => {
                                flistMovies(page);
                                },
                                pageSize: 20,
                                total: dataMovies && dataMovies?.totalPages > 10000 ? 10000 : dataMovies?.totalPages
                            }}
                            dataSource={dataMovies?.results}
                            renderItem={item => (
                                <List.Item>
                                    <Card                                    
                                        hoverable
                                        style={{ width: 240 }}
                                        cover={<img src={pathImage+item.posterPath} alt='poster' onClick={() => showMovieDetail(item)}/>}
                                    >
                                        <Meta title={item.title} description={'Estreno: '+item.releaseDate} />
                                    </Card>
                                </List.Item>
                            )}
                        />            
                    </div> 
                </Spin>
                <br />
                <Row gutter={[16, 10]}>
                    <Col xs={24} sm={24} md={11} lg={11} xl={11} xxl={11}>                
                        <Search
                            placeholder="Buscar pelicula por Titulo"
                            allowClear
                            enterButton
                            size="large"
                            onChange={onChangeBlanck}
                            onSearch={(value) => fSearchMovie(value)}
                            />
                    </Col>
                    <Col xs={24} sm={24} md={11} lg={11} xl={11} xxl={11}>
                        <Link to={'/mylist'}>
                            <Button type="primary" block>
                                Ver mi Lista
                            </Button>
                        </Link>
                    </Col> 
                </Row>                 
                <Modal onCancel={handleCancel} 
                       footer={[
                                <Button key="Regresar" onClick={handleCancel}>
                                    Regresar
                                </Button>
                            ]} 
                        title="Información de la Pelicula" width={900} open={isModalOpen}>
                    <MovieDetail dataMovie={dataMovie}/>
                </Modal>
            </Col>        
        </Row> 
        </div>        
    )
}


const MovieDetail: React.FC<IMovie | any> = (props) => {
    const pathImageSmall = 'https://image.tmdb.org/t/p/w154';
    const { dataMovie } = props;

    const onFinish = (values: any) => {
        fScore(dataMovie.id, values.score)        
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

    const fScore = async (id: number, score: number) => {
        try {
            const data = await fetchScore(id, score);

            if (data.success) {
                notification.info({
                    message: 'Puntuación registrada correctamente',                    
                    className: 'custom-class',
                    duration: 3,
                    placement: 'top',
                    style: {
                      width: 500,
                    },
                  });
            }  else {
                notification.info({
                    message: data.status_message,                    
                    className: 'custom-class',
                    duration: 3,
                    placement: 'top',
                    style: {
                      width: 500,
                    },
                  });
            }

        } catch (error) {
            console.log(error);
        } 
    }
     
    return (
      <>
          <Row gutter={[16, 16]}>
            <Row >
                <Descriptions.Item ><img src={pathImageSmall+dataMovie.posterPath} alt='poster' /></Descriptions.Item>
                <Descriptions bordered column={{ xs: 1, sm: 2, md: 2, lg: 2, xxl: 2 }}>                    
                    <Descriptions.Item label="Titulo">{dataMovie.title}</Descriptions.Item>
                    <Descriptions.Item label="Fecha de estreno">{dataMovie.releaseDate}</Descriptions.Item>
                    <Descriptions.Item label="Lenguaje Original">{dataMovie.originalLanguage}</Descriptions.Item>
                    <Descriptions.Item label="Titulo original">{dataMovie.originalTitle}</Descriptions.Item>                    
                    <Descriptions.Item label="Popularidad">{dataMovie.popularity}</Descriptions.Item>
                    <Descriptions.Item label="Puntuación">{dataMovie.voteCount}</Descriptions.Item>
                    <Descriptions.Item label="Average de puntuación">{dataMovie.voteAverage}</Descriptions.Item>                    
                </Descriptions> 
                <Descriptions.Item label="Reseña">{dataMovie.overview}</Descriptions.Item> 
                <Divider plain orientation="left">Puntuar ( minimo 0.5 - maximo 10)</Divider>
            </Row>
            <Row >
                <Form
                    name="scoreForm"
                    layout="inline"
                    initialValues={{ score: 0.5 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    >
                        <Row gutter={[12, 12]}>
                            <Form.Item
                                    name="score"
                                >
                                    <InputNumber max={10} min={0.5} placeholder="Puntuar ( minimo 0.5 - maximo 10)" style={{ marginLeft: '20px', width: '100%' }}/>
                                </Form.Item>
                            <Button type="primary" htmlType="submit" style={{ marginLeft: '20px' }}>
                                Enviar puntuación
                            </Button>
                        </Row>
                </Form>
            </Row>
          </Row>
      </>
    );
  };

export default ListMovies;