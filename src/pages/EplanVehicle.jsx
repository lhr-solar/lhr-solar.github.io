import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Button, Loader } from '@mantine/core';
import {MANIFEST_URL} from "../config.js";

export default function EplanVehicle() {
    const { vehicle } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${MANIFEST_URL}eplan-manifest.json`)
            .then((res) => res.json())
            .then((json) => {
                const vehicleFolder = json.folders.find((f) => f.name === vehicle);
                setData(vehicleFolder || null);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [vehicle]);

    if (loading) return <Loader size="xl" style={{ margin: '100px auto', display: 'block' }} />;

    if (!data) return <p>Vehicle not found</p>;

    const projects = data.folders || [];

    return (
        <Container size="lg" style={{ paddingTop: 40 }}>
            <Grid gutter="xl">
                {projects.map((project) => (
                    <Grid.Col key={project.name} span="content">
                        <Button
                            size="lg"
                            color="orange"
                            radius="md"
                            style={{ width: 220, height: 80 }}
                            onClick={() => navigate(`/eplan/${encodeURIComponent(vehicle)}/${encodeURIComponent(project.name)}`)}
                        >
                            {project.name}
                        </Button>
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    );
}
