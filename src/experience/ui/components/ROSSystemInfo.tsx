import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IconChevronDown } from '@tabler/icons-react';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

const invoices = [
  { name: 'ROS Robot Base (Standard)', qty: 1, price: '$750.00' },
  { name: 'ROS Robot Base (Robotic Arm)', qty: 1, price: '$980.00' },
  { name: 'RK3588 AI Core Board', qty: 1, price: '$280.00' },
  { name: 'RTSP Scene Camera', qty: 1, price: '$125.00' },
  { name: 'Smart Traffic Light', qty: 1, price: '$85.00' },
  { name: 'Smart Barrier Gate', qty: 1, price: '$75.00' },
  { name: 'Smart Street Lamp', qty: 6, price: '$90.00' },
  { name: 'LPR USB Camera', qty: 1, price: '$45.00' },
  { name: 'Vinyl Simulation Map', qty: 1, price: '$55.00' },
  { name: 'License Plate Set', qty: 1, price: '$14.99' },
];

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

const CHART_COLOR1 = 'lab(77.5052% -6.4629 -36.42)';
const CHART_COLOR2 = 'lab(54.1736% 13.3369 -74.6839)';

export default function ROSSystemInfo() {
  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const className = clsx(open ? 'h-fit' : 'h-37.5', 'overflow-hidden', 'relative');

  useEffect(() => {
    // requestAnimationFrame(() => ref.current?.scrollTo({ top: 0 }));
  }, []);

  return (
    <div
      ref={ref}
      className="text-muted-foreground text-sm -mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4 [&_strong]:text-foreground space-y-4 [&_strong]:font-semibold"
    >
      <div className="space-y-1">
        <p>
          <strong>Product Name: </strong>Robot Operating System
        </p>
        <p>
          An open-source robotics software framework designed to simplify development through
          modular design and a distributed architecture.
        </p>
      </div>
      <div className="space-y-1">
        <p>
          <strong>Specifications:</strong>
        </p>
        <ul>
          <li>Processor: 3.6GHz Octa-Core</li>
          <li>Memory: 16GB RAM</li>
          <li>Storage: 1TB SSD</li>
          <li>Display: 15.6” 4K UHD</li>
          <li>Battery Life: 12 hours</li>
          <li>Weight: 2.1kg</li>
        </ul>
      </div>
      <div className="space-y-1">
        <p>
          <strong>KeyFeature:</strong>
        </p>
        <ol className="list-decimal ps-3.5">
          <li>
            Real-time Digital Twin Synchronization: High-fidelity 3D visualization of the ROS robot
            and sandbox environment with synchronized motion.
          </li>
          <li>
            Live Trajectory Tracking: Real-time plotting and display of the robot's movement path.
          </li>
          <li>
            Intelligent Infrastructure Monitoring: Real-time status feedback for interactive
            elements including streetlights, barriers, and traffic signals.
          </li>
          <li>
            Automated Interaction (Fruit Harvesting): Integrated support for specialized tasks like
            autonomous fruit picking.
          </li>
          <li>
            Multi-source Live Feeds: Simultaneous real-time video streaming of both the physical
            robot and the sandbox environment.
          </li>
        </ol>
      </div>
      <div className="space-y-1">
        <p>
          <strong>Price:</strong>
        </p>
        <p>$2,499.99 (Includes 2-Car models)</p>
        <div className={className}>
          <Table>
            <TableHeader className="h-7">
              <TableRow>
                <TableHead className="w-25">Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.name}>
                  <TableCell className="font-medium">{invoice.name}</TableCell>
                  <TableCell>{invoice.qty}</TableCell>
                  <TableCell className="text-right">{invoice.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell className="text-right">$2,499.99</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div
            hidden={open}
            className="w-full h-24 absolute bottom-0 flex justify-center items-end"
            style={{ background: 'linear-gradient(to top, #fff, transparent)' }}
          >
            <Button variant="ghost" className="text-foreground" onClick={() => setOpen(true)}>
              Check More <IconChevronDown />
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <p>
          <strong>Analytics: </strong>
        </p>
      </div>
      <div className="space-y-1">
        <Tabs defaultValue="velocity">
          <TabsList className="w-full">
            <TabsTrigger value="velocity">Velocity</TabsTrigger>
            <TabsTrigger value="battery">Battery</TabsTrigger>
          </TabsList>
          <TabsContent value="velocity">
            <Card>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} strokeDasharray="3" />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <CustomLinearGradient />
                    <Area
                      dataKey="mobile"
                      type="natural"
                      fill="url(#fillMobile)"
                      fillOpacity={0.4}
                      stroke={CHART_COLOR2}
                      stackId="a"
                    />
                    <Area
                      dataKey="desktop"
                      type="natural"
                      fill="url(#fillDesktop)"
                      fillOpacity={0.4}
                      stroke={CHART_COLOR1}
                      stackId="a"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="battery">
            <Card>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} strokeDasharray="3" />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <Bar
                      dataKey="desktop"
                      type="natural"
                      fill={CHART_COLOR2}
                      stroke={CHART_COLOR2}
                      fillOpacity={1}
                      stackId="a"
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function CustomLinearGradient() {
  return (
    <defs>
      <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor={CHART_COLOR1} stopOpacity={0.8} />
        <stop offset="95%" stopColor={CHART_COLOR1} stopOpacity={0.1} />
      </linearGradient>
      <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor={CHART_COLOR2} stopOpacity={0.8} />
        <stop offset="95%" stopColor={CHART_COLOR2} stopOpacity={0.1} />
      </linearGradient>
    </defs>
  );
}
