import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Loader, Group } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { MANIFEST_URL, ASSETS_BASE_URL } from '../config.js';

export default function EplanProject() {
    const { vehicle, project } = useParams();
    const [projectData, setProjectData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('html');
    const theme = useMantineTheme();

    useEffect(() => {
        document.documentElement.style.margin = '0';
        document.documentElement.style.padding = '0';
        document.body.style.margin = '0';
        document.body.style.padding = '0';

        fetch(`${MANIFEST_URL}eplan-manifest.json`)
            .then((res) => res.json())
            .then((json) => {
                const vehicleFolder = json.folders.find((f) => f.name === vehicle);
                const projectFolder = vehicleFolder?.folders.find((f) => f.name === project);
                setProjectData(projectFolder || null);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [vehicle, project]);

    if (loading) {
        return (
            <Loader
                size="xl"
                style={{
                    margin: '100px auto',
                    display: 'block',
                }}
            />
        );
    }

    if (!projectData) return <p style={{ textAlign: 'center' }}>Project not found</p>;

    const htmlFile = projectData.files.find((f) => f.name.toLowerCase().endsWith('index.html'));
    const pdfFile = projectData.files.find((f) => f.name.toLowerCase().endsWith('.pdf'));

    const fileUrl =
        view === 'html' && htmlFile
            ? `${ASSETS_BASE_URL}eplan/${vehicle}/${project}/${htmlFile.name}`
            : view === 'pdf' && pdfFile
                ? `${ASSETS_BASE_URL}eplan/${vehicle}/${project}/${pdfFile.name}`
                : null;

    return (
        <div
            style={{
                margin: 0,
                padding: 0,
                width: '100%',
                height: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Top selector bar */}
            <div
                style={{
                    padding: '8px 12px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                    flexShrink: 0,
                }}
            >
                <Group position="center" >
                    {htmlFile && (
                        <Button
                            size="sm"
                            variant={view === 'html' ? 'filled' : 'light'}
                            onClick={() => setView('html')}
                        >
                            3D Model
                        </Button>
                    )}
                    {pdfFile && (
                        <Button
                            size="sm"
                            variant={view === 'pdf' ? 'filled' : 'light'}
                            onClick={() => setView('pdf')}
                        >
                            PDF
                        </Button>
                    )}
                </Group>
            </div>

            {/* Full viewer */}
            {fileUrl ? (
                <iframe
                    src={fileUrl}
                    title={view}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        flexGrow: 1,
                    }}
                />
            ) : (
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                    No file available for selected view.
                </p>
            )}
        </div>
    );
}
