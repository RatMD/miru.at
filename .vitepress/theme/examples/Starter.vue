<template>
    <div class="welcome-canvas">
        <div class="welcome-intro">
            <Badge variant="outline">A LITTLE PREVIEW OF WHAT’S NEXT</Badge>
            <h1>
                Small pieces.
                <br />
                <em>Something great.</em>
            </h1>
            <p>
                A place for interfaces with a little more character. Your next example starts here.
            </p>
        </div>
        <Card class="welcome-card">
            <CardHeader>
                <Badge variant="accent" class="welcome-badge">Made with miru.</Badge>
                <CardTitle>Make yourself at home.</CardTitle>
                <CardDescription>
                    Real components. A responsive canvas. And the code to make it yours.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div class="welcome-details">
                    <div>
                        <span>01</span>
                        <strong>Explore the preview</strong>
                        <p>Click around. These components are live.</p>
                    </div>
                    <div>
                        <span>02</span>
                        <strong>Find your fit</strong>
                        <p>Try desktop, tablet or a smaller screen.</p>
                    </div>
                    <div>
                        <span>03</span>
                        <strong>Make it your own</strong>
                        <p>Open the code and take a little inspiration.</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter class="welcome-footer">
                <span role="status">
                    {{ saved ? 'A little inspiration, saved.' : 'Ready when you are.' }}
                </span>
                <Button :variant="saved ? 'outline' : 'primary'" @click="saved = !saved">
                    {{ saved ? 'Saved ✓' : 'Save a little inspiration' }}
                </Button>
            </CardFooter>
        </Card>
    </div>
</template>

<script lang="ts" setup>
import {
    Badge,
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@rat.md/miru';
import { ref } from 'vue';

const saved = ref(false);
</script>

<style scoped>
.welcome-canvas {
    max-width: 900px;
    margin: auto;
    padding: 40px 16px;
}
.welcome-intro {
    text-align: center;
    margin-bottom: 36px;
}
.welcome-intro h1 {
    margin: 24px 0 16px;
    font-size: clamp(36px, 6vw, 58px);
    font-weight: 650;
    line-height: 1.08;
    letter-spacing: -0.055em;
}
.welcome-intro em {
    color: var(--ui-accent-text);
    font:
        italic 1.1em Georgia,
        serif;
}
.welcome-intro > p {
    max-width: 400px;
    margin: auto;
    color: var(--ui-muted-foreground);
    font-size: 14px;
    line-height: 1.8;
}
.welcome-card {
    box-shadow: 0 24px 70px #0000000a;
}
.welcome-badge {
    width: fit-content;
    margin-bottom: 10px;
}
.welcome-details {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    padding-block: 12px;
}
.welcome-details span {
    display: block;
    margin-bottom: 12px;
    color: var(--ui-accent-text);
    font: 11px monospace;
}
.welcome-details strong {
    font-size: 13px;
    font-weight: 550;
}
.welcome-details p {
    margin: 8px 0 0;
    color: var(--ui-muted-foreground);
    font-size: 12px;
    line-height: 1.7;
}
.welcome-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border-top: 1px solid var(--ui-border);
    padding-top: 20px;
}
.welcome-footer > span {
    color: var(--ui-muted-foreground);
    font-size: 11px;
}
@media (max-width: 600px) {
    .welcome-canvas {
        padding: 20px 0;
    }
    .welcome-details {
        grid-template-columns: 1fr;
        gap: 18px;
    }
    .welcome-details span {
        margin-bottom: 6px;
    }
    .welcome-footer {
        align-items: stretch;
        flex-direction: column;
    }
}
</style>
