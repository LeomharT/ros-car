export default function ROSSystemInfo() {
  return (
    <div className="text-muted-foreground text-sm -mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4 [&_strong]:text-foreground space-y-4 [&_strong]:font-semibold">
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
      </div>
      <div className="space-y-1">
        <p>
          <strong>Analytics</strong>
        </p>
      </div>
    </div>
  );
}
