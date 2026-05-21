import type { CapacitorConfig } from '@capacitor/cli';

/* Configuração principal do Capacitor para gerar o aplicativo Android. */
const config: CapacitorConfig = {
  appId: 'br.com.gabriel.fakestore',
  appName: 'FakeStore Gabriel',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

/* Exportação da configuração para o Capacitor conseguir ler o arquivo. */
export default config;
