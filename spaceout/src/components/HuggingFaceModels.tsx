import React, { FC } from 'react';
import styled from '@emotion/styled';
import Icons from 'gatsby-theme-spaceout/src/icons';
import ExternalLink from './ExternalLink';

interface HFModel {
  name: string;
  slug: string;
  likes?: number;
  format: string;
  dataset: string;
  tags: string[];
  license: string;
  description: string;
}

const models: HFModel[] = [
  {
    name: 'Gemma-4-Rust-Coder',
    slug: 'MassivDash/Gemma-4-Rust-Coder',
    likes: 38,
    format: 'GGUF',
    dataset: 'Fortytwo-Network/Strandset-Rust-v1',
    tags: [
      'gemma4',
      'llama.cpp',
      'unsloth',
      'vision-language-model',
      'rust',
      'coding',
    ],
    license: 'mit',
    description:
      'A fine-tune of Gemma 4 specialized for Rust systems programming, memory safety, and high-performance development. Trained with Unsloth Studio for idiomatic Rust, Send/Sync concurrency with async runtimes like Tokio, and vision-to-code translation of architecture diagrams into working Rust.',
  },
  {
    name: 'Qwen3.5-4B-TypeScript-Coder',
    slug: 'MassivDash/qwen3.5-4B-typescript-coder',
    likes: 8,
    format: 'GGUF',
    dataset: 'mhhmm/typescript-instruct-20k',
    tags: [
      'qwen3_5',
      'llama.cpp',
      'unsloth',
      'vision-language-model',
      'typescript',
    ],
    license: 'mit',
    description:
      'A fine-tune of Qwen 3.5 4B built for TypeScript development, architectural reasoning, and full-stack engineering. Deeply tuned for strict type safety and generics across React, Next.js, and Node.js, with visual-to-code support for turning UI screenshots into type-safe logic.',
  },
  {
    name: 'Gemma-4-TypeScript-Coder',
    slug: 'MassivDash/Gemma-4-typescript-coder',
    likes: 5,
    format: 'GGUF',
    dataset: 'mhhmm/typescript-instruct-20k',
    tags: [
      'gemma4',
      'llama.cpp',
      'unsloth',
      'vision-language-model',
      'typescript',
    ],
    license: 'mit',
    description:
      'A fine-tune of Gemma 4 engineered for TypeScript-centric web development, strict type safety, and modern full-stack architectures. Focused on complex generics, utility types, and frameworks like Next.js, React, and Vue 3, with vision-language support for turning wireframes into type-safe components.',
  },
];

const HuggingFaceModels: FC = () => (
  <Grid>
    {models.map((model) => (
      <Card key={model.slug}>
        <CardHeader>
          <Icons.HuggingFace fill="#FFD21E" size={28} />
          <ExternalLink
            href={`https://huggingface.co/${model.slug}`}
            target="_blank"
            rel="noopener nofollow noreferrer"
          >
            {model.name}
          </ExternalLink>
        </CardHeader>
        <MetaRow>
          <Pill>{model.format}</Pill>
          <Pill>license: {model.license}</Pill>
          {typeof model.likes === 'number' && <Pill>♥ {model.likes}</Pill>}
        </MetaRow>
        <Description>{model.description}</Description>
        <MetaRow>
          {model.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </MetaRow>
        <DatasetNote>
          Fine-tuned on <code>{model.dataset}</code>
          <br />
          Big thanks to the dataset authors 🙏
        </DatasetNote>
      </Card>
    ))}
  </Grid>
);

export default HuggingFaceModels;

const Grid = styled.div`
  display: grid;
  max-width: 1150px;
  grid-gap: 25px;
  margin: 20px auto;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid ${(p: any) => p.theme.colors.horizontalRule};
  background: ${(p: any) => p.theme.colors.card};
  transition: box-shadow 0.25s var(--ease-in-out-quad);

  &:hover {
    box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Pill = styled.span`
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 20px;
  background: ${(p: any) => p.theme.colors.horizontalRule};
  color: ${(p: any) => p.theme.colors.primary};
`;

const Tag = styled.span`
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 20px;
  border: 1px solid ${(p: any) => p.theme.colors.horizontalRule};
  color: ${(p: any) => p.theme.colors.grey};
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: ${(p: any) => p.theme.colors.grey};
  margin: 0;
`;

const DatasetNote = styled.p`
  font-size: 12px;
  color: ${(p: any) => p.theme.colors.grey};
  margin: 0;

  code {
    font-size: 12px;
  }
`;
