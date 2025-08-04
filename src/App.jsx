import {Button, Container, Grid} from '@mantine/core';
import {useNavigate} from 'react-router-dom';
import './App.css'

function App() {
    const navigate = useNavigate();

    return (
        <Container size="lg" style={{ paddingTop: 40 }}>
            <Grid gutter="xl">
                <Grid.Col span="auto" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        size="xl"
                        color="blue"
                        radius="md"
                        style={{ width: 200, height: 100 }}
                        onClick={() => navigate('/eplan')}
                    >
                        ePlan
                    </Button>
                </Grid.Col>
            </Grid>
        </Container>
    )
}

export default App
