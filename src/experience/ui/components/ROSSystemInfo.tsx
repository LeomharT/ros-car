import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IconChevronDown } from '@tabler/icons-react';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

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
          <li>Processor : 3.6GHz Octa-Core</li>
          <li>Memory : 16GB RAM</li>
          <li>Storage : 1TB SSD</li>
          <li>Display : 15.6” 4K UHD</li>
          <li>Battery Life: 12 hours</li>
          <li>Weight : 2.1kg</li>
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
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
