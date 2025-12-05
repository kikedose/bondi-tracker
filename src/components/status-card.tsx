import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const xhrTest = async () => {
  const url = '/usuario/urbano2_cmd.php/?cmd=seleccionatraza';

  console.log('🚀 Making request to:', url); // Will show localhost
  console.log(
    '🎯 This will be proxied to:',
    'https://micronauta4.dnsalias.net' + url
  );

  const body = new URLSearchParams({
    ruta: '52',
    cliente_id: '421',
    conf: 'cbaciudad',
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include', // 🔥 REQUIRED FOR PHP SESSION
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    if (!response.ok) {
      throw new Error(
        `Server returned ${response.status} ${response.statusText}`
      );
    }

    return await response.text(); // some endpoints don’t send JSON
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
};

export function StatusCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>TITLE</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>CONTENT</div>
        <button type="button" onClick={xhrTest}>
          Request Test
        </button>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <p>FOOTER</p>
      </CardFooter>
    </Card>
  );
}
