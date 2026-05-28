import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('games')
export class Game {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column({ name: 'provider_name' })
  providerName: string;

  @Column({ name: 'thumb_url', type: 'text' })
  thumbUrl: string;

  @Column({ name: 'start_url', type: 'text', nullable: true })
  startUrl?: string;
}